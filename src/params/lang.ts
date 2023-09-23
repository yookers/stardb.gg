import languages from '$lib/languages.json';

export function match(param: string): boolean {
    return languages.some(language => language.id === param);
}