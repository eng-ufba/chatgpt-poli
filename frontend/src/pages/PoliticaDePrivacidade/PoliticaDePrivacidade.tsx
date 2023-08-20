import { ReactElement, useContext } from "react";
import { ContextPage, PAGE_VALUE, SetContextPage } from "../../helpers/page-manager/pageManager";
import { isNull } from "lodash-es";
import { Modal } from "../../components/Modal/Modal";
import './PoliticaDePrivacidade.scss';

export const PoliticaDePrivacidade = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];

    const onBackButtonClick = (): void => {
        const rawCourse = localStorage.getItem('course');

        if (isNull(rawCourse)) {
            setPage(PAGE_VALUE.CHOOSE_COURSE);
        } else {
            setPage(PAGE_VALUE.HOME);
        }
    }

    return <div className="politics-page">
    <Modal>
        <div className="header">
            <h1 className="title">Política de Privacidade</h1>
        </div>
        <p className="description">
        A sua privacidade é fundamental para nós. Aqui está um resumo de como lidamos com as suas informações:<br/><br/>
        1. Informações Coletadas: Coletamos apenas seu curso para personalizar respostas e enviar informações relevantes.<br/><br/>
        2. Uso das Informações: Utilizamos suas informações para fornecer respostas precisas, enviar respostas por e-mail e melhorar nosso serviço.<br/><br/>
        3. Armazenamento e Proteção: Armazenamos suas informações com segurança e usamos medidas de proteção para evitar acesso não autorizado.<br/><br/>
        4. Compartilhamento: Não compartilhamos suas informações, a menos que você dê consentimento ou haja exigências legais.<br/><br/>
        5. Alterações na Política: Podemos atualizar a política, e você concorda com as mudanças continuando a usar o chatbot.
        </p>

        <div className="button-container">
            <button className="back-button" onClick={onBackButtonClick}>Voltar</button>
        </div>
    </Modal>
</div>
}