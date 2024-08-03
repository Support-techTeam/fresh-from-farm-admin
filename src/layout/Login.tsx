import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useLogin,
  useNotify,
} from "react-admin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const translate = useTranslate();

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (formValues: FormValues) => {
    setLoading(true);
    console.log(formValues, "formValues");

    // Ensure email and password are strings
    if (
      typeof formValues.email !== "string" ||
      typeof formValues.password !== "string"
    ) {
      notify("Email and password must be strings", { type: "error" });
      setLoading(false);
      return;
    }

    login({ email: formValues.email, password: formValues.password })
      .then(() => {
        setLoading(false);
        const nextPathname = (location.state as any)?.nextPathname || "/";
        navigate(nextPathname, { replace: true });
      })
      .catch((error: Error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : error.message || "ra.auth.sign_in_error",
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          }
        );
        // Reset form values on error
        setFormValues({ email: "", password: "" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | Fresh From Farm Admin!</title>
        <link rel="canonical" href={window?.location?.href} />
      </Helmet>
      <Form onSubmit={handleSubmit} noValidate>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "flex-start",
            background: "url(https://source.unsplash.com/featured/1600x900)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Card sx={{ minWidth: 300, marginTop: "6em" }}>
            <Box
              sx={{
                margin: "1em",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/assets/logos/Logo.png"
                alt="F23-Logo"
                width={80}
                height={80}
                className="mr-4 md:mr-1 cursor-pointer py-1.5 lg:ml-2 md:ml-6"
              />
            </Box>
            <Box
              sx={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "center",
                color: (theme) => theme.palette.grey[500],
              }}
            >
              {/* Hint: demo / demo */}
            </Box>
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  source="email"
                  label={translate("Email")}
                  value={formValues.email}
                  onChange={(e: any) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  disabled={loading}
                  validate={required()}
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="password"
                  label={"Password"}
                  type="password"
                  value={formValues.password}
                  onChange={(e: any) =>
                    setFormValues({ ...formValues, password: e.target.value })
                  }
                  disabled={loading}
                  validate={required()}
                />
              </Box>
            </Box>
            <CardActions sx={{ padding: "0 1em 1em 1em" }}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ backgroundColor: "#BFC831" }}
                disabled={loading}
                fullWidth
              >
                {loading && <CircularProgress size={25} thickness={2} />}
                {"SIGN IN"}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Form>
    </>
  );
};

export default Login;

interface FormValues {
  email?: string;
  password?: string;
}
