export const logs = (text) => {
    process.stdout.write(util.format(text) + '\n')
}
