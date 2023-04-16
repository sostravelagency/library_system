import "./widgetLg.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment";

export default function WidgetLg(props) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">History transaction</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Time borrow</th>
          <th className="widgetLgTh">Book</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {props?.data?.map((item, key) => (
          <tr key={key} className="widgetLgTr">
            <td className="widgetLgUser">
              <AccountCircleIcon style={{ width: 40, height: 40 }} />
              <span className="widgetLgName">{item?.user_name}</span>
            </td>
            <td className="widgetLgDate">{moment(item?.time_borrow).format("DD-MM-YYYY HH:mm:ss")}</td>
            <td className="widgetLgAmount">{item?.book_name}</td>
            <td className="widgetLgStatus">
              {
                parseInt(item?.state)=== 1 && 
                <Button type="Approved" />
              }
              {
                parseInt(item?.state)=== 2 && 
                <Button type="Declined" />
              }
              {
                parseInt(item?.state)=== 3 && 
                <button style={{color: "orange"}} className={"widgetLgButton"}>Finish</button>
              }
              {
                parseInt(item?.state)=== 4 && 
                <button style={{color: "gray"}} className={"widgetLgButton"}>Overdue</button>
              }
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
