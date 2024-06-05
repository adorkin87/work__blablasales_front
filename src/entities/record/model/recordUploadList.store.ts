import { action, makeObservable, observable } from 'mobx';

import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';

class RecordUploadListStore {
    rootStore: RootStore;

    files: { file: File; state: 'init' | 'loading' | 'done' | 'error' }[] | null = null;
    selectedAgent?: string | null = null;
    selectedScript: string | null = null;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore, initFiles: File[]) {
        makeObservable(this, {
            files: observable,
            selectedAgent: observable,
            selectedScript: observable,
            add: action,
            uploadList: action,
            uploadOne: action,
            del: action,
            setSelectedAgent: action,
            setSelectedScript: action
        });

        this.rootStore = rootStore;
        initFiles && this.add(initFiles);
    }

    add(files: File[]) {
        const uploaded = this.files ? [...this.files] : [];
        const upload = [...files];

        upload.some((uploadFile: File): void => {
            if (uploaded.findIndex((uploadedFile) => uploadedFile.file.name === uploadFile.name) === -1)
                uploaded.push({ file: uploadFile, state: 'init' });
        });

        this.files = uploaded;
    }

    async uploadList() {
        if (this.state === 'loading' || !this.files || !this.selectedScript) return;
        this.state = 'loading';

        const payload = new FormData();
        this.selectedAgent && payload.append('agent_id', this.selectedAgent);
        payload.append('script_id', this.selectedScript);
        for (const [index, value] of this.files.entries()) {
            if (this.files[index].state === 'done') continue;
            payload.append('file', value.file);
            try {
                this.files![index].state = 'loading';
                await this.rootStore.api.record.add(payload);
                this.files![index].state = 'done';
            } catch (err) {
                this.files![index].state = 'error';
            }
            payload.delete('file');
        }

        this.state = 'done';
    }

    async uploadOne(index: number) {
        if (this.state === 'loading' || !this.files || !this.selectedScript) return;
        this.state = 'loading';

        const payload = new FormData();
        this.selectedAgent && payload.append('agent_id', this.selectedAgent);
        payload.append('script_id', this.selectedScript);
        payload.append('file', this.files[index].file);
        try {
            this.files[index].state = 'loading';
            await this.rootStore.api.record.add(payload);
            this.files[index].state = 'done';
        } catch (err) {
            this.files[index].state = 'error';
        }

        this.state = 'done';
    }

    del(index: number) {
        if (!this.files) return;
        this.files.splice(index, 1);
        if (this.files.length === 0) this.files = null;
    }

    setSelectedAgent(newValue: string | null) {
        this.selectedAgent = newValue;
    }

    setSelectedScript(newValue: string | null) {
        this.selectedScript = newValue;
    }
}

export default RecordUploadListStore;
