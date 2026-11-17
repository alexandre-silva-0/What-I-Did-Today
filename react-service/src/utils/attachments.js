// Mesmas regras do back (task service/src/helpers/upload.ts)
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
export const MAX_FILES = 8 // por envio

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif', '.pdf', '.txt', '.docx', '.xlsx']

// Valor do atributo accept do <input type="file">
export const ACCEPT = ALLOWED_EXTENSIONS.join(',')

export const getExtension = (name = '') => {
    const dot = name.lastIndexOf('.')
    return dot >= 0 ? name.slice(dot).toLowerCase() : ''
}

// HEIC/HEIF ficam de fora: só o Safari consegue mostrar a miniatura
const PREVIEW_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
export const canPreview = (name) => PREVIEW_EXTENSIONS.includes(getExtension(name))

export const iconFor = (name) => {
    const ext = getExtension(name)
    if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'].includes(ext)) return 'bi-image'
    if (ext === '.pdf') return 'bi-file-earmark-pdf'
    if (ext === '.docx') return 'bi-file-earmark-word'
    if (ext === '.xlsx') return 'bi-file-earmark-excel'
    return 'bi-file-earmark-text'
}

export const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
}

// Separa os arquivos aceitos dos recusados, com o motivo do primeiro recusado
export const validateFiles = (files, alreadySelected = 0) => {
    const accepted = []
    let error = null

    for (const file of files) {
        if (!ALLOWED_EXTENSIONS.includes(getExtension(file.name))) {
            error ??= `Tipo de arquivo não permitido: ${file.name}`
        } else if (file.size > MAX_FILE_SIZE) {
            error ??= `"${file.name}" passa de 10 MB.`
        } else if (alreadySelected + accepted.length >= MAX_FILES) {
            error ??= `Envie no máximo ${MAX_FILES} arquivos por vez.`
        } else {
            accepted.push(file)
        }
    }

    return { accepted, error }
}
