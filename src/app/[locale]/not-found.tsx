import { useTranslations } from "next-intl";

export default function NotFoundPage() {
	const translations = useTranslations("notFound");
	return <h1>{translations("title")}</h1>;
}
