import styled from "styled-components";
import { Paper } from "@material-ui/core"

export const Thumbnail = ({ image, className }) => {
  return (
    <StyledContainer className={className} elevation={3}>
      <a href={image.link} rel="noreferrer" target="_blank">
        <StyledImage src={image.thumbnail} alt={image.title || "photo"} />
        <StyledOverlay>
            <StyledAuthor>
              <h1 className="t-w-full t-text-ellipsis t-whitespace-nowrap t-overflow-hidden t-font-semibold t-text-[14px]">{image.caption}</h1>
              <p className="t-font-light t-text-[11px] mt-1">posted by <span className="t-font-semibold">{image.author}</span></p>
            </StyledAuthor>
        </StyledOverlay>
      </a>
    </StyledContainer>
  )
}

const StyledAuthor = styled.div`
  font-weight: 700;
  text-shadow: 0 1px 8px rgb(0 0 0 / 10%);
  background-color: rgba(94, 92, 92, 0.8);;
  height: fit-content;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const StyledImage = styled.img`
  width: 100%;
  vertical-align: middle;
  min-height: 150px;
`;

const StyledOverlay = styled.div`
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  transition: opacity 0.2s ease-in-out;


`;

const StyledContainer = styled(Paper)`
  position: relative;
  margin-top: 8px;
  &:hover ${StyledOverlay} {
    opacity: 1;
  }
`;
