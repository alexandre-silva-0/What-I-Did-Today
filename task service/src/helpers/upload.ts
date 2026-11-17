import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

// Pasta dos arquivos. No Docker é /app/uploads (montada como volume no compose)
export const UPLOADS_DIR = path.resolve(process.env.UPLOADS_DIR ?? 'uploads')
fs.mkdirSync(UPLOADS_DIR, { recursive: true })

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB por arquivo
export const MAX_FILES = 8                    // por envio (o Cloudflare limita o corpo a 100 MB)

// Extensão -> tipo. A extensão decide se aceita, porque alguns celulares mandam
// HEIC como "application/octet-stream"
const ALLOWED_TYPES: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.heic': 'image/heic',
    '.heif': 'image/heif',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const mimeTypeFor = (fileName: string) =>
    ALLOWED_TYPES[path.extname(fileName).toLowerCase()] ?? 'application/octet-stream'

// O navegador manda o nome em UTF-8, mas o multer lê como latin1
// ("foto ação.jpg" viraria "foto aÃ§Ã£o.jpg")
export const decodeFileName = (name: string) => Buffer.from(name, 'latin1').toString('utf8')

const storage = multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (_req, file, cb) => {
        cb(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
    }
})

const multerUpload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()

        if (!ALLOWED_TYPES[ext]) {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', decodeFileName(file.originalname)))
            return
        }

        cb(null, true)
    }
}).array('files', MAX_FILES)

const UPLOAD_ERRORS: Record<string, string> = {
    LIMIT_FILE_SIZE: `Cada arquivo pode ter no máximo ${MAX_FILE_SIZE / 1024 / 1024} MB.`,
    LIMIT_FILE_COUNT: `Envie no máximo ${MAX_FILES} arquivos por vez.`,
}

// Recebe os arquivos do campo "files" e transforma os erros do multer em 422 { errors: [...] }
export const uploadFiles = (req: Request, res: Response, next: NextFunction) => {
    multerUpload(req, res, (error: unknown) => {
        if (error instanceof multer.MulterError) {
            const message = error.code === 'LIMIT_UNEXPECTED_FILE' && error.field
                ? `Tipo de arquivo não permitido: ${error.field}`
                : UPLOAD_ERRORS[error.code] ?? 'Não foi possível receber os arquivos.'

            return res.status(422).json({ errors: [message] })
        }

        if (error) return next(error)

        const files = req.files as Express.Multer.File[] | undefined
        if (!files || files.length === 0) {
            return res.status(422).json({ errors: ['Selecione ao menos um arquivo.'] })
        }

        next()
    })
}

// Apaga arquivos da pasta de uploads, ignorando os que já não existem
export const removeStoredFiles = async (storedNames: string[]) => {
    await Promise.all(
        storedNames.map((name) =>
            fs.promises.rm(path.join(UPLOADS_DIR, path.basename(name)), { force: true })
        )
    )
}
