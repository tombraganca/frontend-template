/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Base URL of your backend. When unset, the in-memory mock auth is used. */
	readonly VITE_API_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
