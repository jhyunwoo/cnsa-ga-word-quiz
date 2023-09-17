import KakaoSingIn from "./KakaoSignIn";

export default function SignIn() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-8">
      <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center w-full max-w-lg shadow-lg">
        <h2 className="text-lg font-semibold p-4">로그인</h2>
        <KakaoSingIn />
      </div>
    </div>
  );
}
