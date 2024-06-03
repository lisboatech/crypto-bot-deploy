import "../styles/globals.css";
import { PROVIDER } from "../context/context";
import toast, { Toaster } from "react-hot-toast";


export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Provedor de contexto envolve os componentes da aplicação */}
      <PROVIDER>
        <Component {...pageProps} />
      </PROVIDER>
      {/* Componente Toaster para exibir notificações de alerta  */}
      <Toaster />


      {/* Adição de scripts externos */}
      <script type="text/javascript" src="js/jquery.js?ver=1.0.0"></script>
      <script type="text/javascript" src="js/plugins.js?ver=1.0.0"></script>
      <script type="text/javascript" src="js/init.js?ver=1.0.0"></script>
    </>
  );
};

