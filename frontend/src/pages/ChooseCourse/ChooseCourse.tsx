import { ReactElement, useContext, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import './ChooseCourse.scss';
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { isEmpty, isNull } from "lodash-es";
import { ContextPage, PAGE_VALUE, SetContextPage } from "../../helpers/page-manager/pageManager";

export const ChooseCourse = (): ReactElement => {
    const [selectedCourse, setSelectedCourse] = useState<string>(() => {
        const rawCourse = localStorage.getItem('course');

        if (isNull(rawCourse)) {
            return '';
        }
        return JSON.parse(rawCourse);
    });
    const courses = ['Engenharia química', 'Engenharia de controle e automação'];
    const [clickOutsideEmit, setClickOutsideEmit] = useState<boolean>(() => false);
    const [errorMessage, setErrorMessage] = useState<string>(() => '');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(() => false);
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

    return <div className="choose-course" onClick={clickOutsideDropdown}>
        <Modal>
            <div className="header">
                <h1 className="title">Selecione seu curso</h1>
            </div>
            <p className="description">
                Para utilizar o sistema, é necessário escolher um curso.
            </p>
            <div className="course-container">
                <label>Curso</label>
                <Dropdown options={courses} selected={selectedCourse} setSelected={setSelectedCourse} clickOutsideEmit={clickOutsideEmit}/>
            </div>

            <div className="checkbox-container">
                <input type="checkbox" onChange={toggleCheckbox} checked={isCheckboxChecked}/>
                <p className="checkbox-text" onClick={toggleCheckbox}>
                    Eu li e aceito os <a className="link">termos de uso</a> e <a className="link">política de privacidade</a>
                </p>
            </div>
            <p hidden={!errorMessage} className="error-message">{errorMessage}</p>
            <div className="button-container">
                <button className="save-button" onClick={save}>Salvar</button>
            </div>
        </Modal>
    </div>
}