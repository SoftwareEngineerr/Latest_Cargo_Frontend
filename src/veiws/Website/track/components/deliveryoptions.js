// src/components/DeliveryOptions.jsx
import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function DeliveryOptions() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      {/* Delivery Details */}
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        د سپارلو معلومات
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        کله چې ستاسو پارسل د لېږد په حالت کې شي، موږ به د سپارلو نېټه اضافه کړو.
      </Typography>

      {/* Accordion - Manage Delivery */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SettingsIcon fontSize="small" />
            <Typography fontWeight={600}>خپل سپارل مدیریت کړئ</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            وړیا اختیارونه
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            هغه اختیارونه چې تل وړیا وي
          </Typography>

          <Stack direction="row" spacing={2} mb={2}>
            <Button
              variant="outlined"
              startIcon={<AssignmentOutlinedIcon />}
              sx={{ textTransform: "none" }}
            >
              د سپارلو لارښوونې
            </Button>
            <Button
              variant="outlined"
              startIcon={<WorkOutlineOutlinedIcon />}
              sx={{ textTransform: "none" }}
            >
              رخصتي درول
            </Button>
          </Stack>

          <Alert
            icon={<WarningAmberIcon />}
            severity="error"
            variant="outlined"
          >
            د لېږدونکي د محدودیتونو له امله، د دې بار لپاره نور سپارلو اختیارونه
            نشته. د نورو معلوماتو لپاره مهرباني وکړئ له لېږدونکي سره اړیکه ونیسئ.
          </Alert>
        </AccordionDetails>
      </Accordion>

      {/* Accordion - Get Updates */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <NotificationsNoneIcon fontSize="small" />
            <Typography fontWeight={600}>اړیک تازه معلومات ترلاسه کړئ</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            تاسو کولای شئ چې د برېښنالیک یا SMS له لارې د لېږد تازه معلوماتو ترلاسه کولو لپاره ګډون وکړئ.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: "none" }}
          >
            ګډون وکړئ
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
