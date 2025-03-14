import { useRouter } from "next/navigation";

export default function NoFavoritesMsg() {
    const { push } = useRouter();

    return (
        <div className="px-4 md:px-8 lg:px-10 w-full flex flex-col gap-y-5 items-center justify-center min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-80px)]">
            <h1 className="font-raleway font-extrabold text-3xl lg:text-4xl text-white text-center">
                Sua lista de favoritos está vazia
            </h1>

            <p className="font-normal text-base text-neutral-400 text-center lg:text-[17px]">
                Marque filmes e series como favoritos para que eles apareçam aqui.
            </p>

            <button 
                className="btn bg-primary text-black hover:bg-primary rounded-[10px] w-full max-w-56 font-bold outline-none border-none"
                onClick={() => push('/', {scroll: true})}>
                Voltar ao inicio
            </button>
        </div>
    );
};