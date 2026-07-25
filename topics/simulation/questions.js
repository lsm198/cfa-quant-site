window.TOPIC_QUESTIONS = [
  {
    "id": "imported-024",
    "stem_en": "An analyst draws samples from an original sample to estimate the standard error  of a population mean. Which of the following best describes this sampling  procedure?",
    "choices_en": [
      "A. Bootstrap method",
      "B. Cluster sampling method",
      "C. Convenience sampling method"
    ],
    "answer": "A",
    "explanation_en": "Correct because in bootstrap, we repeatedly draw samples from the original sample, and each resample is of\nthe same size as the original sample. Note that each item drawn is replaced for the next draw (Le the identical\nelement is put back into the group so that it can be drawn more than once). Assuming we are looking to find the\nstandard error of sample mean, we take many resamples and then compute the mean of each resample.",
    "los": "describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications",
    "explanation_zh": ""
  },
  {
    "id": "imported-051",
    "stem_en": "Which of the following is required to compute the standard error of a sample  mean using the bootstrap resampling method?",
    "choices_en": [
      "A. The mean of each resample",
      "B. The mean of the original sample",
      "C. The standard deviation of the original sample"
    ],
    "answer": "A",
    "explanation_en": "Correct because the equation to estimate the standard error of the sample mean effectively computes the\nsample standard deviation of the different means generated across all resamples. Hence the mean of each\nresample is required. However, neither the mean, nor the standard deviation, of the original sample are\nrequired.",
    "los": "describe the use of resampling (bootstrap, jackknife) to estimate the sampling distribution of a statistic",
    "explanation_zh": ""
  }
];
