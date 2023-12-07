import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';

export async function getServerSideProps(context) {
  const { shortUrl } = context.query;
  await dbConnect();
  const shortLink = await ShortLink.findOne({ shortUrl });
  if (shortLink) {
    return {
      redirect: {
        destination: shortLink.url,
        parmanent: false,
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function ShortUrlPage() {
  return null;
}
