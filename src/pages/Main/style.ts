import styled from "@emotion/styled"

export const MainSection = styled.section`
  padding: 80px 0;

  .section-inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    img {
      width: 500px;
      height: 400px;
      object-fit: contain;
    }
  }
`

export const HowItWorksSection = styled.section`
  padding: 80px 0;
  background-color: #f1f4f9;

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;

    .icon-wrap {
      padding: 8px;
      border-radius: 6px;
      background-color: #fff5f5;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export const HowItWorksCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
