import util from 'node:util';
import { watch } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const execFilePromise = util.promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ac = new AbortController();
const { signal } = ac;

const VALID_EXTENSIONS = ['html', 'css', 'js'];

function extractExtension(directoryWithFile) {
    const fullFileName = directoryWithFile.split('/').reverse()[0];
    const extension = fullFileName.split('.')[1];

    return extension;
}

async function updateResources(ext) {
    if (!ext || !VALID_EXTENSIONS.includes(ext)) {
        return;
    }

    if (ext === 'js' || ext === 'html') {
        await execFilePromise('yarn', ['workspace', '@orion/app', 'copy:src']);
    } else if (ext === 'css') {
        await execFilePromise('yarn', ['workspace', '@orion/app', 'copy:css']);
    }
}

(async () => {
    try {
        const watcher = watch(__dirname, { recursive: true, signal });
        console.log(`Watching files in ${__dirname}`);

        for await (const event of watcher) {
            const { _, filename } = event;
            console.log(`Changed file: ${filename}...`);

            const extension = extractExtension(filename);
            await updateResources(extension);
        }
    } catch (err) {
        if (err.name === 'AbortError') return;
        throw err;
    }
})();
