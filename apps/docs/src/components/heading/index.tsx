import Head from "next/head";

interface IProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = "Canvacord";
const DEFAULT_DESC =
  "Canvacord allows you to easily generate custom images using React and tailwindcss-like syntax.";

export function HeadingMeta(props: IProps) {
  const { title = DEFAULT_TITLE, description = DEFAULT_DESC } = props;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <link rel="icon" href="/icon.png" type="image/png" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="canvas,canvacord,node-canvas,satori,html-to-image,javascript,typescript,image-generation,api"
      />
      <meta name="theme-color" content="#0d9488" />
    </Head>
  );
}
