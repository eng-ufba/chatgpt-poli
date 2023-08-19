import { ReactElement, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import './ChooseCourse.scss';
import { Dropdown } from "../../components/Dropdown/Dropdown";

export const ChooseCourse = (): ReactElement => {
    const [selectedCourse, setSelectedCourse] = useState<string>(() => '');
    const courses = ['Engenharia química', 'Engenharia de controle e automação'];
    const [clickOutsideEmit, setClickOutsideEmit] = useState<boolean>(() => false)

    const clickOutsideDropdown = (): void => {
        setClickOutsideEmit(previousValue => !previousValue);
    }

    return <div className="choose-course" onClick={clickOutsideDropdown}>
        <Modal>
            <div className="header">
                <h1 className="title">Selecione seu curso</h1>
                <button>x</button>
            </div>
            <p className="description">
                Para utilizar o sistema, é necessário escolher um curso.
            </p>
            <div className="course-container">
                <label>Curso</label>
                <Dropdown options={courses} selected={selectedCourse} setSelected={setSelectedCourse} clickOutsideEmit={clickOutsideEmit}/>
            </div>

            <div className="checkbox-container">
                <input type="checkbox" name="" id="" />
                <p className="checkbox-text">
                    Eu li e aceito os <a>termos de uso</a> e <a>política de privacidade</a>
                </p>
            </div>
            <div className="button-container">
                <button className="save-button">Salvar</button>
            </div>
        </Modal>
    </div>
}