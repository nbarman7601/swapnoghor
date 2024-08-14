export const Row = ({columns, item})=>{
    return (
        <tr>
            {
                columns.map((column, index)=>(
                    <td  key={index}>
                        {item[column.columnKey]}
                    </td>
                ))
            }
        </tr>
    )
}