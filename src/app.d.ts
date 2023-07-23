// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
        interface Locals {
            user: {
                username: string,
                email: string,
                admin: boolean,
                uids: string[],
            }
          }        
	}
}

export {};
