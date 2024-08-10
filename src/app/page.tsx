import Container from "@/components/Container";
import images from "@/lib/images";

export default async function Home() {
  const imageNames = await images.getAll();

  if (!imageNames) return <div>No images found</div>;

  const protocol = process.env.PHOTOFRAME_PROTOCOL;
  const host = process.env.PHOTOFRAME_HOST;
  const port = process.env.PHOTOFRAME_PORT;
  const path = process.env.PHOTOFRAME_PATH;

  const baseUrl = `${protocol}://${host}:${port}${path}/`;

  return (
    <>
      <Container baseUrl={baseUrl} images={imageNames} />
    </>
  );
}
