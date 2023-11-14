import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {useForm} from "../../utils/hooks/useForm";

export const AccountSetupBasicInformation = ({userData, setUserData, setActiveStep}) => {

  const form = useForm({
    item: userData,
    fieldConfig: {
      "Tell us a little about yourself": {
        defaultValue: userData["Tell us a little about yourself"],
        label: "Tell us a little about yourself",
        tooltip: "This will be displayed on your profile page and will be used by the AI to tailor your experience",
      },
      "What is your preferred learning style?": {
        defaultValue: userData["What is your preferred learning style?"],
        label: "What is your preferred learning style?",
      },
      "Do you prefer to learn in shorter bursts or longer sessions?": {
        defaultValue: userData["Do you prefer to learn in short bursts or long sessions?"],
        label: "Do you prefer to learn in short bursts or long sessions?",
      },
      "What are your feelings around the use of Emojis? 🤔": {
        defaultValue: userData["What are your feelings around the use of Emojis? 🤔"],
        label: "What are your feelings around the use of Emojis? 🤔",
      },
    },
    disableSubmitButton: true,
  })

  return (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ mb: 3, pb: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Personality Profile
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              <CardContent>
                {form.display}
              </CardContent>

            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Button
              fullWidth size="large"
              variant="contained"
              disabled={form?.input?.firstName === '' || form?.input?.lastName === ''}
              onClick={() => {
                setUserData(d => ({
                  ...d,
                  bio: Object.entries(form.input).map(([question, answer]) => ({question, answer})),

                }))
                setActiveStep(curr => curr + 1)
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
  );
}
