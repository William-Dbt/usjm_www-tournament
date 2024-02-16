export default function isStringEmpty(str) {
	return (str == null || str.match(/^\s*$/) !== null);
}
