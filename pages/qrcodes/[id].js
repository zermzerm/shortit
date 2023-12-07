import Head from 'next/head';
import QRCodeForm, { QRCodeFormType } from '@/components/QRCodeForm';
import styles from '@/styles/QRCodeEditPage.module.css';
import axios from '@/lib/axios';
import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();
  const qrcodes = await QRCode.findById(id);
  if (qrcodes) {
    return {
      props: {
        qrcodes: JSON.parse(JSON.stringify(qrcodes)),
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function QRCodeEditPage({ qrcodes }) {
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmit(values) {
    await axios.patch(`/qrcodes/${id}`, values);
    router.push('/qrcodes/');
  }

  return (
    <>
      <Head>
        <title>QRCode 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>QRCode 수정하기</h1>
        <QRCodeForm
          type={QRCodeFormType.Edit}
          initialValues={qrcodes}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
