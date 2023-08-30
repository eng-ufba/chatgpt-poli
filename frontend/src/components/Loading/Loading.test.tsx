import { render } from "@testing-library/react";
import { Loading } from "./Loading";

test('Should load the loading component', () => {
    render(<Loading />)
});