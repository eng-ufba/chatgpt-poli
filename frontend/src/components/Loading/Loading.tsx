import { ReactElement } from "react";
import { isUndefined } from "lodash-es";
import './Loading.scss';

type LoadingProps = {
    isToShow?: boolean
}

export const Loading = ({ isToShow }: LoadingProps): ReactElement => {
    const getIsLoadingHidden = (): boolean => {
        if(isUndefined(isToShow)) {
            return false;
        }
        return isToShow ? false : true;
    }

    return <div className="loading" hidden={getIsLoadingHidden()}></div>
}