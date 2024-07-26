let timer: number;

export default function debounce(f: Function, timeout: number) {
	clearTimeout(timer);
	timer = setTimeout(f, timeout);
}
