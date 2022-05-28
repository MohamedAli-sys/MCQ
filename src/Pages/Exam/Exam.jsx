import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  StepConnector,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allQuestions } from "../../Questions/Questions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { increase } from "../../Store/ResultSlice";

const Exam = () => {
  const globalState = useSelector((state) => state);
  const [questions, setQuestions] = useState(allQuestions);
  const [question, setQuestion] = useState({
    id: 0,
    question: "",
    answers: [],
    correntAnswer: "",
  });
  const [answered, setAnswered] = useState(false);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const getQuestion = () => {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    setQuestion(() => {
      return {
        ...randomQuestion,
        answers: [...randomQuestion.answers].sort(() => Math.random() - 0.5),
      };
    });
    setCounter(counter + 1);
    console.log(question);
  };

  useEffect(() => {
    let loggedIn = globalState.auth.login;
    if (!loggedIn) nav("/Login");
    getQuestion();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let newList = questions.filter((q) => q.id !== question.id);
    setQuestions(newList);
    setAnswered(false);
    if (data.get("question") === question.correntAnswer) dispatch(increase(1));
    counter < 7 ? getQuestion() : nav("/Result");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Student Name:{" "}
          <span style={{ fontWeight: "bold" }}>{globalState.auth.name}</span>
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Questions Answered :{" "}
          <span style={{ fontWeight: "bold" }}>{counter} / 7</span>
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0px 0 6px 2px #88888875",
          padding: "30px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" sx={{ pb: 2, fontWeight: "bold" }}>
          {question.question} ?
        </Typography>
        <StepConnector />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate={false}
          sx={{ mt: 1 }}
        >
          <FormControl>
            <RadioGroup name="question">
              {question.answers.map((ans, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={ans.answer}
                    control={<Radio />}
                    label={ans.answer}
                    onClick={() => setAnswered(true)}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!answered}
            >
              Next Question <ArrowForwardIcon fontSize="small" sx={{ ml: 2 }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Exam;
