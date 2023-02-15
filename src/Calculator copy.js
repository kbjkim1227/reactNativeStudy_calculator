import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";
import { useCalculator } from "./use-calculator";

const oneBlockWidth = 80; // 한블럭에 해당하는 가로길이

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === "reset"
      ? COLOR.RESET
      : type === "operator"
      ? COLOR.OPERATOR
      : type === "num"
      ? COLOR.NUM
      : "transparent";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        // paddingVertical: 10,
        width: oneBlockWidth * flex,
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: "black",
      }}
    >
      <Text style={{ color: "lightgrey", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const COLOR = {
  RESULT: "#4e4c51",
  RESET: "#5f5e62",
  OPERATOR: "#f39c29",
  NUM: "#5c5674",
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  width: ${oneBlockWidth * 4}px;
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  /* padding: 5px; // top, right, bottom, left */
  padding: 10px 5px; // top,bottom(vertical), left,right(horizontal)
  /* padding: 1px 2px 3px 4px; // top right botoom left */
`;
// padding: 5px; // 위아래좌우
// padding: 10px px; // 위아래(vertical), 좌우(horizontal)
// padding: 5px 10px 5px 10px; //위 오른쪽 아래 왼쪽 순서

export default () => {
  const {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  } = useCalculator(); // hook을 사용하여 필요한 것만 가져와서 UI에서 사용

  return (
    //* 확인용
    <View style={{ flex: 1, justifyContent: "center" }}>
      {__DEV__ && (
        <>
          <Text>input : {input}</Text>
          <Text>currentOperator : {currentOperator}</Text>
          <Text>result : {result}</Text>
          <Text>tempInput : {tempInput}</Text>
          <Text>tempOperator : {tempOperator}</Text>
        </>
      )}
      {/* 개발환경에서만 보여질 수 있게 DEV 사용 ??? */}

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: "white", fontSize: 35, textAlign: "right" }}>
          {input}
        </Text>
      </InputContainer>

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button
          type="reset"
          text={hasInput ? "C" : "AC"}
          // onPress={() => onPressReset()}
          onPress={onPressReset}
          flex={3}
        />
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator("/")}
          flex={1}
          isSelected={currentOperator === "/"}
        />
      </ButtonContainer>
      {/* [7 ~ x] */}

      <ButtonContainer>
        {[7, 8, 9].map(
          (
            num // 맵 함수를 이용하여 배열의 길이 만큼 리턴된 component를 반환
          ) => (
            // <Button type="num" text={String(num)} onPress={() => null} flex={1} />
            <Button
              key={`num-${num}`}
              type="num"
              text={`${num}`}
              onPress={() => onPressNum(num)}
              flex={1}
            />
          )
        )}
        <Button
          type="operator"
          text="*"
          onPress={() => onPressOperator("*")}
          flex={1}
          isSelected={currentOperator === "*"}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          // <Button type="num" text={String(num)} onPress={() => null} flex={1} />
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator("-")}
          flex={1}
          isSelected={currentOperator === "-"}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          // <Button type="num" text={String(num)} onPress={() => null} flex={1} />
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator("+")}
          flex={1}
          isSelected={currentOperator === "+"}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button type="num" text="0" onPress={() => onPressNum(0)} flex={3} />
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator("=")}
          flex={1}
        />
      </ButtonContainer>
    </View>
  );
};
