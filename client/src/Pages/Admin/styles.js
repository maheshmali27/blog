import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    adminLink: {
        textDecoration: 'none'
    },
    adminSection: {
        marginTop: '20px',
        padding: '25px',
        display: 'flex',
        border: '1px solid #bababa',
        borderRadius: 5
    },
    adminChildSection: {
        padding: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #bababa',
        borderRadius: 5
    }
}))