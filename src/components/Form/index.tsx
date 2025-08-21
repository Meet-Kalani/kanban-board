import {
  Box,
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Ticket } from "../../types/ticket";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hook";
import { addTicket, updateTicket } from "../../features/ticket/ticketSlice";
import { FORM_MODE, PRIORITIES_MAP, STATUS_MAP } from "../../constants/ticket";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Form = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ticket>({
    defaultValues: {
      title: state?.title || "",
      description: state?.description || "",
      status: state?.status || "todo",
      priority: state?.priority || "low",
    },
  });

  const onSubmit: SubmitHandler<Ticket> = (data) => {
    if (state.mode === FORM_MODE.CREATE) {
      dispatch(
        addTicket({
          ...data,
          status: state.board,
        })
      );
    } else if (state.mode === FORM_MODE.UPDATE) {
      dispatch(
        updateTicket({
          ...data,
          id: state.id,
        })
      );
    }

    navigate("/");
  };

  return (
    <Box>
      <Button
        onClick={() => navigate("/")}
        startIcon={<KeyboardDoubleArrowLeftIcon />}
      >
        Back to home page
      </Button>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {state?.mode === FORM_MODE.UPDATE
            ? "Update Ticket"
            : "Create a new ticket"}
        </Typography>
        <Card
          sx={{
            width: 500,
            padding: 3,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Title"
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title && "This field is required"}
              {...register("title", { required: true })}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description && "This field is required"}
              {...register("description", { required: true })}
            />
            {state?.mode === FORM_MODE.UPDATE && (
              <TextField
                select
                label="Status"
                defaultValue={state?.status || "todo"}
                error={!!errors.status}
                helperText={errors.status && "This field is required"}
                {...register("status", { required: true })}
              >
                {STATUS_MAP.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              select
              label="Priority"
              error={!!errors.priority}
              defaultValue={state?.priority || "low"}
              helperText={errors.priority && "This field is required"}
              {...register("priority", { required: true })}
            >
              {PRIORITIES_MAP.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained">
              {state?.mode === FORM_MODE.UPDATE ? "Update" : "Create"}
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Form;
