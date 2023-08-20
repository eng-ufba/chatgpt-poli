import { ReactElement, useContext, useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import './ChooseCourse.scss';
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { isEmpty, isNull, isString } from "lodash-es";
import { ContextPage, PAGE_VALUE, SetContextPage } from "../../helpers/page-manager/pageManager";

export const ChooseCourse = (): ReactElement => {
    const [selectedCourse, setSelectedCourse] = useState<string>(() => {
        const rawCourse = localStorage.getItem('course');
        const rawDraftCourse = localStorage.getItem('draftCourse');

        if (isString(rawCourse)) {
            return JSON.parse(rawCourse);
        } else if (isString(rawDraftCourse)) {
            return JSON.parse(rawDraftCourse);
        } else {
            return '';
        }        
    });
    const courses = ['Engenharia química', 'Engenharia de controle e automação'];
    const [clickOutsideEmit, setClickOutsideEmit] = useState<boolean>(() => false);
    const [errorMessage, setErrorMessage] = useState<string>(() => '');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(() => {
        {
            const rawDraftIsCheckboxChecked = localStorage.getItem('draftIsCheckboxChecked');
    
            if (isNull(rawDraftIsCheckboxChecked)) {
                return '';
            }
            return JSON.parse(rawDraftIsCheckboxChecked);
        }
    });
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];

    const clickOutsideDropdown = (): void => {
        setClickOutsideEmit(previousValue => !previousValue);
    }

    const save = (): void => {
        if (isEmpty(selectedCourse)) {
            setErrorMessage(() => 'É preciso selecionar um curso');
        }
        else if (!isCheckboxChecked) {
            setErrorMessage(() => 'É preciso aceitar os termos acima');
        }
        else {
            setErrorMessage(() => '');
            const rawCourse = JSON.stringify(selectedCourse);
            localStorage.setItem('course', rawCourse);
            setPage(PAGE_VALUE.HOME);
        }
    }
    
    const toggleCheckbox = (): void => {
        setIsCheckboxChecked((previousValue) => !previousValue);
    }

    const openTermosPage = (): void => {
        setPage(PAGE_VALUE.TERMOS_DE_USO);
    }

    const openPoliticaPage = (): void => {
        setPage(PAGE_VALUE.POLITICA_DE_PRIVACIDADE);
    }

    useEffect(() => {
        const rawDraftIsCheckboxChecked = JSON.stringify(isCheckboxChecked);
        localStorage.setItem('draftIsCheckboxChecked', rawDraftIsCheckboxChecked);
    }, [isCheckboxChecked]);

    useEffect(() => {
        const rawDraftCourse = JSON.stringify(selectedCourse);
        localStorage.setItem('draftCourse', rawDraftCourse);
    }, [selectedCourse]);

    return <div className="choose-course" onClick={clickOutsideDropdown}>
        <Modal>
            <div className="header">
                <h1 className="title">Selecione seu curso</h1>
            </div>
            <p className="description">
                Para utilizar o sistema, é necessário escolher um curso. O curso selecionado irá ajudar o chatbot escrever respostas melhores.
            </p>
            <div className="course-container">
                <label>Curso</label>
                <Dropdown options={courses} selected={selectedCourse} setSelected={setSelectedCourse} clickOutsideEmit={clickOutsideEmit}/>
            </div>

            <div className="checkbox-container">
                <input type="checkbox" onChange={toggleCheckbox} checked={isCheckboxChecked}/>
                <p className="checkbox-text" onClick={toggleCheckbox}>
                    Eu li e aceito os <a className="link" onClick={openTermosPage}>termos de uso</a> e <a className="link" onClick={openPoliticaPage}>política de privacidade</a>
                </p>
            </div>
            <p hidden={!errorMessage} className="error-message">{errorMessage}</p>
            <div className="button-container">
                <button className="save-button" onClick={save}>Salvar</button>
            </div>
        </Modal>
    </div>
}