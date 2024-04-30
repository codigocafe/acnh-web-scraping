import { to_slug, get_extension, print_log_message, __repeat } from "../../acnh/utils";

describe("Utilitários", () => {

    test("Converter texto em SLUG", () => {
        const text:string = "Cachaça não é doce.";
        expect(to_slug(text)).toBe('cachaca-nao-e-doce')
    });

    test("Indetificar qual a extensão do arquivo via URL", () => {
        const url:string = "https://dodo.ac/np/images/thumb/4/4d/Bitterling_NH_Icon.png/64px-Bitterling_NH_Icon.png";
        expect(get_extension(url)).toBe('png');
    });

    test("Criar pontilhamento para preenchimento de texto", () => {
        const character:string = ".";
        const quantity:number = 5;
        expect(__repeat(character, quantity)).toBe('.....');
        expect(__repeat(character, quantity)).toHaveLength(quantity);
    });

    test("Criar mensagem de retorno com preenchimento de pontos", () => {
        const text:string = "Texto de exibição";
        const time:number = 150.00078;
        expect(print_log_message(text, time)).toBe('Texto de exibição ........................................... 150.00ms');
        expect(print_log_message(text, time)).toHaveLength(70);
    });

});
