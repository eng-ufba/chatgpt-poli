import { ReactElement, useContext } from "react";
import { ContextPage, PAGE_VALUE, SetContextPage } from "../../helpers/page-manager/pageManager";
import { isNull } from "lodash-es";
import { Modal } from "../../components/Modal/Modal";
import './TermosDeUso.scss';

export const TermosDeUso = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];

    const onBackButtonClick = (): void => {
        const rawCourse = localStorage.getItem('course');

        if (isNull(rawCourse)) {
            setPage(PAGE_VALUE.CHOOSE_COURSE);
        } else {
            setPage(PAGE_VALUE.HOME);
        }
    }

    const openPoliticaPage = (): void => {
        setPage(PAGE_VALUE.POLITICA_DE_PRIVACIDADE);
    }
        
    return <div className="terms-page">
        <Modal>
            <div className="header">
                <h1 className="title">Termos de Uso</h1>
            </div>
            <p className="description">
            Use o chatbot com responsabilidade e cautela, ao utilizar o nosso chatbot, você concorda com os seguintes termos:<br/><br/>

            1. Uso Responsável: O Chatbot destina-se a fornecer informações educacionais gerais. Use as respostas do chatbot como um guia, mas não tome decisões finais baseadas somente nelas.<br/><br/>
            2. Respostas Geradas por IA: As respostas fornecidas pelo chatbot são geradas por inteligência artificial (IA) e não são garantia de precisão ou veracidade. Recomendamos sempre verificar informações críticas com fontes confiáveis.<br/><br/>
            3. Não Substitui Orientação Profissional: O chatbot não substitui conselhos ou orientações fornecidos por professores, instrutores ou profissionais qualificados. Sempre busque orientação adequada para questões importantes.<br/><br/>
            4. Limitação de Responsabilidade: Não nos responsabilizamos por qualquer dano, perda ou inconveniência causados pelo uso das informações do chatbot. O uso das respostas é por sua conta e risco.<br/><br/>
            5. Propriedade Intelectual: Todo o conteúdo gerado pelo chatbot, incluindo textos, imagens e marca registrada, é de propriedade exclusiva do Chatbot.<br/><br/>
            6. Privacidade: As informações pessoais coletadas são regidas pela nossa <a className="link" onClick={openPoliticaPage}>política de privacidade</a>. Leia-a para entender como usamos e protegemos seus dados.<br/><br/>
            7. Mudanças nos Serviços: Reservamo-nos o direito de alterar ou interromper o chatbot a qualquer momento, sem aviso prévio.<br/><br/>
            8. Uso Proibido: O uso do chatbot para atividades ilegais, prejudiciais, abusivas ou fraudulentas é estritamente proibido.<br/><br/>
            9. Aceitação dos Termos: O uso contínuo do Chatbot após a leitura destes termos indica a sua aceitação completa.<br/><br/>
            Estes são os Termos de Uso que regem a sua utilização do Chatbot. Agradecemos por usar nossos serviços e esperamos que eles sejam úteis em sua jornada educacional !
            </p>

            <div className="button-container">
                <button className="back-button" onClick={onBackButtonClick}>Voltar</button>
            </div>
        </Modal>
    </div>
}