import "./TestScreen.css";
import { RowAdminPage } from "../../components/rowAdminPage";

export const TestScreen = () => {
  return (
    <div>
      <RowAdminPage
        product="Lata de Frijol"
        amount="52"
        unit="g"
        brand="tunny"
        stock="10"
        cadDate="2026/10/5"
      />
    </div>
  );
};
