document.addEventListener("DOMContentLoaded", () => {
    const txt = document.getElementById("TXT");
    const chars = document.getElementById("chars");
    const words = document.getElementById("words");

    const buttons = document.querySelectorAll('input[type="button"]');

    /* ======================
       HELPERS
    ====================== */

    function updateCounters() {
        const value = txt.value;
        chars.textContent = value.length;
        words.textContent = value.trim()
            ? value.trim().split(/\s+/).length
            : 0;
    }

    function capitalizeSentences(str) {
        return str.replace(/(^\s*[a-zčćđšž]|[.!?]\s*[a-zčćđšž])/g, c =>
            c.toUpperCase()
        );
    }

    function capitalizeWords(str) {
        return str.replace(/\b[a-zčćđšž]/g, c => c.toUpperCase());
    }

    /* ======================
       LATIN ⇄ CYRILLIC
    ====================== */

    const latinToCyr = [
        ["dž", "џ"], ["lj", "љ"], ["nj", "њ"],
        ["a", "а"], ["b", "б"], ["c", "ц"], ["č", "ч"], ["ć", "ћ"],
        ["d", "д"], ["đ", "ђ"], ["e", "е"], ["f", "ф"], ["g", "г"],
        ["h", "х"], ["i", "и"], ["j", "ј"], ["k", "к"], ["l", "л"],
        ["m", "м"], ["n", "н"], ["o", "о"], ["p", "п"], ["r", "р"],
        ["s", "с"], ["š", "ш"], ["t", "т"], ["u", "у"], ["v", "в"],
        ["z", "з"], ["ž", "ж"]
    ];

    const cyrToLatin = [
        ["џ", "dž"], ["љ", "lj"], ["њ", "nj"],
        ["а", "a"], ["б", "b"], ["ц", "c"], ["ч", "č"], ["ћ", "ć"],
        ["д", "d"], ["ђ", "đ"], ["е", "e"], ["ф", "f"], ["г", "g"],
        ["х", "h"], ["и", "i"], ["ј", "j"], ["к", "k"], ["л", "l"],
        ["м", "m"], ["н", "n"], ["о", "o"], ["п", "p"], ["р", "r"],
        ["с", "s"], ["ш", "š"], ["т", "t"], ["у", "u"], ["в", "v"],
        ["з", "z"], ["ж", "ž"]
    ];

    function convert(text, map) {
        let result = text;
        map.forEach(([from, to]) => {
            const regex = new RegExp(from, "gi");
            result = result.replace(regex, match =>
                match === match.toUpperCase()
                    ? to.toUpperCase()
                    : to
            );
        });
        return result;
    }

    /* ======================
       BUTTON HANDLER
    ====================== */

    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const action = btn.value;

            switch (action) {
                case "Paste":
                    txt.value = await navigator.clipboard.readText();
                    break;

                case "Copy":
                    navigator.clipboard.writeText(txt.value);
                    break;

                case "Clear":
                    txt.value = "";
                    break;

                case "all small":
                    txt.value = txt.value.toLowerCase();
                    break;

                case "ALL CAPS":
                    txt.value = txt.value.toUpperCase();
                    break;

                case "Capitalize Sentences":
                    txt.value = capitalizeSentences(txt.value.toLowerCase());
                    break;

                case "Words Capitalized":
                    txt.value = capitalizeWords(txt.value.toLowerCase());
                    break;

                case "Latin 2 Cyrillic":
                    txt.value = convert(txt.value, latinToCyr);
                    break;

                case "Cyrillic 2 Latin":
                    txt.value = convert(txt.value, cyrToLatin);
                    break;
            }

            updateCounters();
        });
    });

    txt.addEventListener("input", updateCounters);
});