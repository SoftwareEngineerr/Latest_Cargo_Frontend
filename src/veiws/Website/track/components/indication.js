import { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { steps } from "framer-motion";

export default function TrackingTimeline() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = useSelector((state)=>state.Api);
  const [currentStep , setCurrentStep] = useState(0);
  const navigate = useNavigate()

  // Replace this with your real API URL
  const API_URL = `${url.TrackOrder}${id}`  ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (json.success) {
          //console.log(json.orderDetail)
          // const backedResult = json.orderDetail.filter( rm => rm.time == null ? null : rm)
          setData(json.orderDetail.filter(papo => papo.time )); // Use orderDetail array
          setCurrentStep(json.completedCount + 1)
        } else {
          setData([]);
          alert("دا ټریک نمبر شتون نلري")
          navigate('/')
        }
      } catch (err) {
        console.error("Fetch error:", err);

        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>Loading tracking data...</Typography>
      </Box>
    );
  }
//console.log(data || data.length === 0)
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No tracking information found.</Typography>
      </Box>
    );
  }

  const formatAfghanDate = (isoDate) => {
  if (!isoDate) return "";

  return new Intl.DateTimeFormat("fa-AF-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
};

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        د انتقالاتو پرمختګ  
      </Typography>

      <Timeline position="right">
        {data.map((step, index) => {
          const active = index + 1 === currentStep;
          const completed = index + 1 < currentStep;

          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot
                  color={active ? "primary" : completed ? "success" : "grey"}
                  variant={completed || active ? "filled" : "outlined"}
                >
                  {active ? (
                    <ArrowForwardIcon fontSize="small" />
                  ) : completed ? (
                    <CheckIcon fontSize="small" />
                  ) : null}
                </TimelineDot>
{index !== data.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography
                  variant="subtitle1"
                  fontWeight={active || completed ? 600 : 400}
                  color={
                    active
                      ? "primary"
                      : completed
                      ? "success.main"
                      : "text.secondary"
                  }
                >
                  {/* {step.title } */}
                  {step.title == 'OrderCreate' ? 'پارسل ترلاسه سو'
                  : step.title == 'OnTheWay' || step.title == 'forward' ? 'په لاره دی' : 
                  step.title == 'received' ? 'څانګی ته وسپارل سو'
                  :
                    step.title == 'outForDelivery' ? 'د سپارلو لپاره وتلی دی'  
                  //  step.location != null ? step.title == 'outForDelivery' ? 'د سپارلو لپاره وتلی دی' : null 
                  :
                   step.title == 'delivered' ? 'مشتری ته وسپارل سو'
                  :
                  null
                  }

                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.location}
                </Typography>
                {step.time && (
                  <Typography variant="caption" color="black">
                    {formatAfghanDate(step.time)}
                  </Typography>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}