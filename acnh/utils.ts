// TODO aplicar TypeScript
// TODO criar teste em Jest
// TODO aplicar algum design partterns
// TODO converter CommonJS para ECMAScript

const print_log_message = (text, time) => {
    const characters_total_in_line = 70;
    const characters_total_to_remove = text.length - time.toFixed(2).toString().length;
    const dots_total_in_line = characters_total_in_line - characters_total_to_remove;
    console.log(`${text} ${'.'.repeat(dots_total_in_line)} ${time.toFixed(2)} ms`);
}

module.exports = { print_log_message };