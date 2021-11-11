import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {isArray} from "lodash";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import BasicPage from "./BasicPage";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
    },
    summary: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightBold,
    },
    answer: {
        flexDirection: "column",
    },
}));

const FaqPage = () => {
    const [translate] = useTranslation();
    const [expanded, setExpanded] = useState();
    const classes = useStyles();
    const questions = translate("faq.data", {returnObjects: true});

    return (
        <BasicPage title="faq.title">
            <div className={classes.container}>
                {questions.map((question, index) => (
                    <Accordion
                        expanded={expanded === index}
                        key={index}
                        onChange={() => setExpanded((current) => current === index ? null : index)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.summary}>
                                {question.q}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.answer}>
                            {(isArray(question.a) ? question.a : [question.a]).map((text) => (
                                <Typography key={text}>
                                    {text}
                                </Typography>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </BasicPage>
    );
};

export default FaqPage;