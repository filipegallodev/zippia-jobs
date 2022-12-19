import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Zippia | Home</title>
        <meta name="description" content="Home page of Zippia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Home. Nothing here. Go to /test/jobs to use the application!</main>
    </>
  );
}
