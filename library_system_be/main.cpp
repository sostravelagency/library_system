#include <windows.h>

#define ID_EDIT 1
#define ID_FILE_OPEN 2
#define ID_FILE_SAVE 3

HWND hEdit;
TCHAR szFileName[MAX_PATH];

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    switch(msg)
    {
        case WM_CREATE:
        {
            // Tạo điều khiển Textbox
            hEdit = CreateWindowEx(
                WS_EX_CLIENTEDGE,
                TEXT("EDIT"),
                NULL,
                WS_CHILD | WS_VISIBLE | WS_VSCROLL | ES_MULTILINE | ES_AUTOVSCROLL,
                0, 0, 0, 0,
                hwnd,
                (HMENU)ID_EDIT,
                GetModuleHandle(NULL),
                NULL);

            break;
        }
        case WM_SIZE:
        {
            // Thay đổi kích thước của Textbox
            RECT rcClient;
            GetClientRect(hwnd, &rcClient);

            SetWindowPos(
                hEdit,
                NULL,
                0, 0,
                rcClient.right,
                rcClient.bottom,
                SWP_NOZORDER);

            break;
        }
        case WM_COMMAND:
        {
            switch(LOWORD(wParam))
            {
                case ID_FILE_OPEN:
                {
                    OPENFILENAME ofn = {0};
                    ofn.lStructSize = sizeof(ofn);
                    ofn.hwndOwner = hwnd;
                    ofn.lpstrFilter = TEXT("Text Files (*.txt)\0*.txt\0All Files (*.*)\0*.*\0");
                    ofn.lpstrFile = szFileName;
                    ofn.nMaxFile = MAX_PATH;
                    ofn.Flags = OFN_EXPLORER | OFN_FILEMUSTEXIST | OFN_HIDEREADONLY;
                    ofn.lpstrDefExt = TEXT("txt");

                    if(GetOpenFileName(&ofn))
                    {
                        HANDLE hFile = CreateFile(
                            ofn.lpstrFile,
                            GENERIC_READ,
                            0,
                            NULL,
                            OPEN_EXISTING,
                            FILE_ATTRIBUTE_NORMAL,
                            NULL);

                        if(hFile != INVALID_HANDLE_VALUE)
                        {
                            DWORD dwFileSize = GetFileSize(hFile, NULL);
                            if(dwFileSize != INVALID_FILE_SIZE)
                            {
                                LPSTR lpText = (LPSTR)GlobalAlloc(GPTR, dwFileSize + 1);
                                if(lpText != NULL)
                                {
                                    DWORD dwRead;
                                    if(ReadFile(hFile, lpText, dwFileSize, &dwRead, NULL))
                                    {
                                        lpText[dwFileSize] = 0;
                                        SetWindowTextA(hEdit, lpText);
                                    }

                                    GlobalFree(lpText);
                                }
                            }

                            CloseHandle(hFile);
                        }
                    }

                    break;
                }
                case ID_FILE_SAVE:
                {
                    OPENFILENAME ofn = {0};
                    ofn.lStructSize = sizeof(ofn);
                    ofn.hwndOwner = hwnd;
                    ofn.lpstrFilter = TEXT("Text Files (*.txt)\0*.txt\0All Files (*.*)\0*.*\0");
                    ofn.lpstrFile = szFileName;
                    ofn.nMaxFile = MAX_PATH;
                    ofn.Flags = OFN_EXPLORER | OFN_OVERWRITEPROMPT;
                     ofn.lpstrDefExt = TEXT("txt");

                if(GetSaveFileName(&ofn))
                {
                    HANDLE hFile = CreateFile(
                        ofn.lpstrFile,
                        GENERIC_WRITE,
                        0,
                        NULL,
                        CREATE_ALWAYS,
                        FILE_ATTRIBUTE_NORMAL,
                        NULL);

                    if(hFile != INVALID_HANDLE_VALUE)
                    {
                        DWORD dwTextLength = GetWindowTextLength(hEdit);
                        if(dwTextLength > 0)
                        {
                            LPSTR lpText = (LPSTR)GlobalAlloc(GPTR, dwTextLength + 1);
                            if(lpText != NULL)
                            {
                                GetWindowTextA(hEdit, lpText, dwTextLength + 1);

                                DWORD dwWritten;
                                if(!WriteFile(hFile, lpText, dwTextLength, &dwWritten, NULL))
                                {
                                    MessageBox(hwnd, TEXT("Failed to save file!"), TEXT("Error"), MB_OK | MB_ICONERROR);
                                }

                                GlobalFree(lpText);
                            }
                        }

                        CloseHandle(hFile);
                    }
                }

                break;
            }
        }

        break;
    }
    case WM_DESTROY:
    {
        PostQuitMessage(0);
        break;
    }
    default:
    {
        return DefWindowProc(hwnd, msg, wParam, lParam);
    }
}

return 0;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
WNDCLASS wc = {0};
wc.lpfnWndProc = WndProc;
wc.hInstance = hInstance;
wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
wc.lpszClassName = TEXT("Notepad");
if(!RegisterClass(&wc))
{
    MessageBox(NULL, TEXT("Failed to register window class!"), TEXT("Error"), MB_OK | MB_ICONERROR);
    return 0;
}

HWND hwnd = CreateWindowEx(
    0,
    TEXT("Notepad"),
    TEXT("Notepad"),
    WS_OVERLAPPEDWINDOW,
    CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
    NULL,
    NULL,
    hInstance,
    NULL);

if(hwnd == NULL)
{
    MessageBox(NULL, TEXT("Failed to create window!"), TEXT("Error"), MB_OK | MB_ICONERROR);
    return 0;
}

ShowWindow(hwnd, nCmdShow);

MSG msg;
while(GetMessage(&msg, NULL, 0, 0))
{
    TranslateMessage(&msg);
    DispatchMessage(&msg);
}

return (int)msg.wParam;
}