export default function randomPassword() {
    const password = Math.random().toString(36).slice(2, 10);

    return password
}
