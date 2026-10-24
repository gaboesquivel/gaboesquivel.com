/** A superseded or cancelled request must not replace the result now on screen. */
export const isCurrentCompositionRequest = ({
  activeRequest,
  eventRequest,
}: {
  activeRequest: number;
  eventRequest: number;
}) => activeRequest === eventRequest;
