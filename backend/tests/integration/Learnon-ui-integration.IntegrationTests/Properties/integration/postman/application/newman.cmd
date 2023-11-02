@IF EXIST "$~dp0\node.exe" (
    "%~dp0\node.exe  "%~dp0\node_modules\newman\bin\newman.js" %*
) ELSE (
    @SETLOCAL
    @SET PATHEXT=%PATHEXT:;.JS;=;%
    node "%~dp0\node_modules\newman\bin\newman.js" %*
)