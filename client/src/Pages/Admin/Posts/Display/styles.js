import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    gridPostItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0',
        borderBottom: '1px solid rgb(0 0 0 / 12%)',
        '&:last-child': {
            borderBottom: '0'
        },
        '&:nth-child(2n)': {
            backgroundColor: '#eee'
        }
    }
}));