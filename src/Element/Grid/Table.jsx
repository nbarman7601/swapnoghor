import { Row } from "./Row";
import { useTableContext } from "./TableContext"
import { Theader } from "./Theader";

export const Table = ({columns}) => {
    const [state, dispatch]= useTableContext();
    const { data } = state;
    return (
        <table className="styled-table">
            <thead>
                <tr>
                    {
                        columns.map((column, index) => (
                            <Theader
                                key={index}
                                desc={column.desc}
                                columnKey={column.columnKey}
                            />
                        )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => (
                        <Row
                            key={index}
                            item={item}
                            columns={columns}
                        />
                    )
                    )
                }
            </tbody>
        </table>
    )
}