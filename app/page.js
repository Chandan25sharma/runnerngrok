export const dynamic = "force-dynamic";

async function checkOnline(url) {
  if (!url) return false;
  try {
    const res = await fetch(url, {
      headers: { "ngrok-skip-browser-warning": "true" },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    return res.status < 500;
  } catch {
    return false;
  }
}

export default async function Home() {
  const ngrokUrl = process.env.NGROK_URL;
  const online = await checkOnline(ngrokUrl);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "20vh" }}>
      <h1>{online ? "🟢 Server is online" : "🔴 Server is offline"}</h1>
      {ngrokUrl ? (
        <a href={ngrokUrl} style={{ fontSize: "1.2rem" }}>
          Visit Site →
        </a>
      ) : (
        <p>NGROK_URL is not set — add it in Vercel env vars and redeploy.</p>
      )}
    </div>
  );
}
