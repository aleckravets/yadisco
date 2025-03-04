export default async function Login() {
  return (
    <div>
      <h1>Please Log In</h1>
      <a href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID}`}>
        Login with Yandex
      </a>
    </div>
  );
}
