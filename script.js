$(function () {
    //===================================================
    $('.error_txt').text('');

    //변수선언
    const $userName = $('#userName');
    const $userEmail = $('#userEmail');
    const $userPass1 = $('#userPass1');
    const $userPass2 = $('#userPass2');
    let userSex = '';
    let userAgreeCheck = false;
    let validationResult = true;

    //===================================================
    //라디오 변경 때 마다 처리됨
    $('.rdo_group [name=USER_SEX]').on('change', function () {
        $('#sexMsg').text('');
        $('.rdo_group [name=USER_SEX]').each(function () {
            if ($(this).prop('checked')) {
                userSex = $(this).val();
            }
        });
    });

    //체크박스 변경 때 마다 처리됨
    $('#userAgreeCheck').on('change', function () {
        if ($('#userAgreeCheck').prop('checked')) {
            userAgreeCheck = true;
            $('#userAgreeMsg').text('');
        } else {
            userAgreeCheck = false;
        }
    });

    //==================================================
    //keyup 했을때 에러 메세지 숨김
    $userName.on('keyup', function () {
        if ($userName.val().trim() !== '') {
            $('#nameMsg').text('');
        }
    });

    //이메일 keyup 했을때 검사
    $userEmail.on('keyup', function () {
        if ($userEmail.val().trim() !== '') {
            $('#emailMsg').text('');
        }
    });

    //비밀번호1 keyup 했을때 검사
    $userPass1.on('keyup', function () {
        if ($userPass1.val().trim() !== '') {
            $('#passMsg1').text('');
        }
    });

    //=================================================
    //비밀번호 일치 확인
    $userPass2.on('keyup', () => {
        console.log('first');
        if ($userPass1.val().trim() !== $userPass2.val().trim()) {
            $('#passMsg2').text(`비밀번호가 일치 하지 않습니다.`);
        } else {
            $('#passMsg2').html(`<span class='green_txt'>비밀번호가 일치 합니다.</span>`);
        }
    });

    //===================================================
    //약관동의 버튼 인터렉션
    $('#agreeBtn').on('click', function () {
        $(this).toggleClass('on');
        $(this).closest('.row').find('.agree_txt').toggle();
    });

    //===================================================
    //submit 이 발생했을 때 실행
    $('#myForm').on('submit', function (e) {
        e.preventDefault();

        //에러문구 전체 초기화
        $('.error_txt').text('');

        //각 항목별 벨리데이션
        if ($userName.val().trim() === '') {
            $('#nameMsg').text('이름을 입력해 주세요');
            $userName.val('');
            validationResult = false;
        }
        if ($userEmail.val().trim() === '') {
            $('#emailMsg').text('이메일을 입력해 주세요');
            $userEmail.val('');
            validationResult = false;
        }

        if ($userPass1.val().trim() === '') {
            $('#passMsg1').text('비밀번호를 입력해 주세요');
            $userPass1.val('');
            validationResult = false;
        }
        if ($userPass2.val().trim() === '') {
            $('#passMsg2').text('비밀번호 확인을 입력해 주세요');
            $userPass2.val('');
            validationResult = false;
        }

        if (userSex === '') {
            $('#sexMsg').text('성별을 선택해 주세요');
            validationResult = false;
        }
        if (userAgreeCheck === false) {
            $('#userAgreeMsg').text('약관 확인 후 동의해 주세요');
            validationResult = false;
        }

        //벨리데이션 결과 확인
        if (validationResult === false) {
            validationResult = true;
            return;
        }

        //최종 화면에 값 출력
        $('#printBox').html(`
            <p><strong>이름</strong>${$userName.val()}  </p>
            <p><strong>이메일</strong>${$userEmail.val()}  </p>
            <p><strong>비밀번호</strong>${$userPass2.val()}  </p>
            <p><strong>성별</strong>${userSex}  </p>
            <p><strong>약관동의</strong>${userAgreeCheck}  </p>

            `);
    });
});
